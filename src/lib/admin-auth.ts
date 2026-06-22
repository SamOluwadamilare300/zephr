"use server";

import { cookies } from "next/headers";

const COOKIE_NAME = "zephyr_admin";

export async function login(formData: FormData) {
  const password = formData.get("password")?.toString() || "";
  if (!process.env.ADMIN_PASSWORD || password !== process.env.ADMIN_PASSWORD) {
    return { ok: false, error: "Incorrect password" };
  }
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, process.env.ADMIN_PASSWORD, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8, // 8 hours
  });
  return { ok: true };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
