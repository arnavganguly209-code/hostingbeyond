import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
  type AuthenticationResponseJSON,
  type AuthenticatorTransportFuture,
  type RegistrationResponseJSON,
} from "@simplewebauthn/server";

import { prisma } from "@/lib/prisma";

function getRpConfig() {
  const rawHost =
    process.env.ORBIT_RP_ID ||
    process.env.NEXT_PUBLIC_APP_URL?.replace(/^https?:\/\//, "") ||
    "localhost";
  const rpID = rawHost.replace(/:\d+$/, "").replace(/\/$/, "");
  const origin = (
    process.env.ORBIT_ORIGIN ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000"
  ).replace(/\/$/, "");

  return {
    rpName: "HostingBeyond Orbit",
    rpID,
    origin,
  };
}

export async function saveChallenge(
  challenge: string,
  type: "registration" | "authentication",
) {
  const expiresAt = new Date(Date.now() + 1000 * 60 * 5);
  await prisma.webAuthnChallenge.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });
  await prisma.webAuthnChallenge.create({
    data: { challenge, type, expiresAt },
  });
}

async function expectChallenge(
  challenge: string,
  type: "registration" | "authentication",
) {
  const row = await prisma.webAuthnChallenge.findFirst({
    where: { challenge, type },
  });
  if (!row || row.expiresAt.getTime() < Date.now()) return false;
  await prisma.webAuthnChallenge.delete({ where: { id: row.id } });
  return true;
}

export async function createRegistrationOptions(
  adminUserId: string,
  displayName: string,
) {
  const { rpName, rpID } = getRpConfig();
  const existing = await prisma.webAuthnCredential.findMany({
    where: { adminUserId },
  });

  const options = await generateRegistrationOptions({
    rpName,
    rpID,
    userName: "orbit-super-admin",
    userDisplayName: displayName,
    userID: new TextEncoder().encode(adminUserId),
    attestationType: "none",
    excludeCredentials: existing.map((cred) => ({
      id: cred.credentialId,
      transports: cred.transports as AuthenticatorTransportFuture[],
    })),
    authenticatorSelection: {
      residentKey: "preferred",
      userVerification: "preferred",
    },
  });

  await saveChallenge(options.challenge, "registration");
  return options;
}

export async function verifyRegistration(
  adminUserId: string,
  response: RegistrationResponseJSON,
) {
  const { rpID, origin } = getRpConfig();

  const verification = await verifyRegistrationResponse({
    response,
    expectedChallenge: (challenge) =>
      expectChallenge(challenge, "registration"),
    expectedOrigin: origin,
    expectedRPID: rpID,
  });

  if (!verification.verified || !verification.registrationInfo) {
    return { ok: false as const };
  }

  const { credential, credentialDeviceType, credentialBackedUp } =
    verification.registrationInfo;

  await prisma.webAuthnCredential.create({
    data: {
      adminUserId,
      credentialId: credential.id,
      publicKey: Buffer.from(credential.publicKey),
      counter: BigInt(credential.counter),
      transports: (credential.transports ?? []) as string[],
      deviceType: credentialDeviceType,
      backedUp: credentialBackedUp,
    },
  });

  return { ok: true as const };
}

export async function createAuthenticationOptions() {
  const { rpID } = getRpConfig();
  const credentials = await prisma.webAuthnCredential.findMany();

  const options = await generateAuthenticationOptions({
    rpID,
    userVerification: "preferred",
    allowCredentials: credentials.map((cred) => ({
      id: cred.credentialId,
      transports: cred.transports as AuthenticatorTransportFuture[],
    })),
  });

  await saveChallenge(options.challenge, "authentication");
  return options;
}

export async function verifyAuthentication(
  response: AuthenticationResponseJSON,
) {
  const { rpID, origin } = getRpConfig();
  const credential = await prisma.webAuthnCredential.findUnique({
    where: { credentialId: response.id },
    include: { adminUser: true },
  });

  if (!credential) return { ok: false as const };

  const verification = await verifyAuthenticationResponse({
    response,
    expectedChallenge: (challenge) =>
      expectChallenge(challenge, "authentication"),
    expectedOrigin: origin,
    expectedRPID: rpID,
    credential: {
      id: credential.credentialId,
      publicKey: new Uint8Array(credential.publicKey),
      counter: Number(credential.counter),
      transports: credential.transports as AuthenticatorTransportFuture[],
    },
  });

  if (!verification.verified) return { ok: false as const };

  await prisma.webAuthnCredential.update({
    where: { id: credential.id },
    data: {
      counter: BigInt(verification.authenticationInfo.newCounter),
      lastUsedAt: new Date(),
    },
  });

  return { ok: true as const, adminUser: credential.adminUser };
}

export function getWebAuthnConfig() {
  return getRpConfig();
}
