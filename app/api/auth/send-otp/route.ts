// // app/api/auth/send-otp/route.ts
// import { NextResponse } from "next/server";
// import dbConnect from "@/lib/db";
// import User from "@/app/models/User";
// import twilio from "twilio";

// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// export async function POST(req: Request) {
//   try {
//     const { employeeNo } = await req.json();

//     if (!employeeNo) {
//       return NextResponse.json(
//         { message: "Employee No is required" },
//         { status: 400 }
//       );
//     }

//     await dbConnect();
//     const user = await User.findOne({ employeeNo });

//     if (!user || !user.phone) {
//       return NextResponse.json(
//         { message: "User or registered phone number not found." },
//         { status: 404 }
//       );
//     }

//     // Generate 6-digit OTP
//     const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes validity

//     user.otp = generatedOtp;
//     user.otpExpiresAt = expiresAt;
//     await user.save();

//     // Send SMS via Twilio
//     await client.messages.create({
//       body: `Your WLTSERVICES password reset code is: ${generatedOtp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: user.phone,
//     });

//     return NextResponse.json(
//       { message: "OTP sent to your registered mobile number." },
//       { status: 200 }
//     );
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Failed to send OTP." },
//       { status: 500 }
//     );
//   }
// }


// app/api/auth/send-otp/route.ts
import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import User from "@/app/models/User";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(req: Request) {
  try {
    const { employeeNo } = await req.json();

    await dbConnect();
    const user = await User.findOne({ employeeNo });

    if (!user || !user.phone) {
      return NextResponse.json({ message: "User or phone number not found." }, { status: 404 });
    }

    // 1. Format local Sri Lankan number (071...) to E.164 (+9471...)
    let formattedPhone = user.phone.trim();
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "+94" + formattedPhone.slice(1);
    } else if (!formattedPhone.startsWith("+")) {
      formattedPhone = "+94" + formattedPhone;
    }

    // 2. Generate OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = generatedOtp;
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();

    // 3. Send SMS
    await client.messages.create({
      body: `Your WLTSERVICES password reset code is: ${generatedOtp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: formattedPhone, // Sending to +94714940795
    });

    return NextResponse.json({ message: "OTP sent successfully!" }, { status: 200 });
  } catch (error: any) {
    console.error("Twilio Error Details:", error.message);
    return NextResponse.json({ message: error.message || "Failed to send OTP." }, { status: 500 });
  }
}