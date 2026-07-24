
// import { NextResponse } from "next/server";
// import connectToDatabase from "@/lib/db";
// import User from "@/app/models/User";
// import bcrypt from "bcryptjs";

// export async function POST(request: Request) {
//   try {
//     const { name, email, password, role } = await request.json();

//     // 1. Validate inputs
//     if (!name || !password) {
//       return NextResponse.json(
//         { success: false, message: "Name and password are required." },
//         { status: 400 }
//       );
//     }

//     await connectToDatabase();

//     // 2. Check if user already exists
//     const existingUser = await User.findOne({ name });
//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: "User already exists." },
//         { status: 400 }
//       );
//     }

//     // 3. DEFINE hashedPassword HERE 🔑
//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 4. Create new user in MongoDB
//     const newUser = await User.create({
//       name,
//       email,
//       password: hashedPassword, // 🟢 Variable is now defined!
//       role: role || "employee",
//     });

//     return NextResponse.json({ success: true, user: newUser }, { status: 201 });
//   } catch (error: any) {
//     console.error("Register API Error:", error);
//     return NextResponse.json(
//       { success: false, message: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, password, role } = body;

    // 🔍 DEBUG LOG: Check terminal output when registering
    console.log("RECEIVED REGISTER PAYLOAD:", { name, email, role });

    if (!name || !password) {
      return NextResponse.json(
        { success: false, message: "Name and password are required." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: "User already exists." },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔑 Pass 'role' explicitly into User.create()
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "employee",
    });

    console.log("SAVED USER IN DB:", newUser);

    return NextResponse.json(
      {
        success: true,
        user: { id: newUser._id, name: newUser.name, role: newUser.role },
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}