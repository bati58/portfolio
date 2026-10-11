import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hasAdminToken, isAuthorizedAdmin } from "@/lib/admin";

export async function GET(request: NextRequest) {
  if (!hasAdminToken()) return NextResponse.json({ error: "Admin access is not configured." }, { status: 503 });
  if (!isAuthorizedAdmin(request)) return NextResponse.json({ error: "Unauthorized." }, { status: 401 });

  const messages = await prisma.contactMessage.findMany({
    orderBy: { submittedAt: "desc" },
    take: 50,
    select: {
      id: true,
      name: true,
      email: true,
      subject: true,
      submittedAt: true,
      processingStatus: true,
      notificationStatus: true,
      deliveryAttempts: true,
      lastDeliveryError: true,
      deliveredAt: true,
    },
  });

  return NextResponse.json({ messages });
}
