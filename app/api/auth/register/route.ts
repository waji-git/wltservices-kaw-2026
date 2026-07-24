
import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/db";
import User from "@/app/models/User";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, employeeNo, email, password, role } = body;

    // 🔍 DEBUG LOG: Check terminal output when registering
    console.log("RECEIVED REGISTER PAYLOAD:", { name, employeeNo,email, role });

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

    // 🛡️ ADMIN LIMIT LOGIC: Maximum 2 Admins allowed
    const assignedRole = role || "employee";

    if (assignedRole === "admin") {
      const adminCount = await User.countDocuments({ role: "admin" });

      if (adminCount >= 2) {
        // Option A: Block registration with an error message
        return NextResponse.json(
          {
            success: false,
            message: "Admin limit reached! Only 2 admin users are allowed.",
          },
          { status: 403 }
        );

        // Option B: Automatically downgrade to "employee" instead (uncomment below if preferred)
        // assignedRole = "employee";
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 🔑 Create user with validated assignedRole
    const newUser = await User.create({
      name,
      employeeNo,
      email,
      password: hashedPassword,
      role: assignedRole,
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

// import { NextResponse } from "next/server";
// import connectToDatabase from "@/lib/db";
// import User from "@/app/models/User";
// import bcrypt from "bcryptjs";

// export async function POST(request: Request) {
//   try {
//     const body = await request.json();
//     const { name, employeeNo, email, password, role } = body;

//     // 🔍 DEBUG LOG: Check terminal output when registering
//     console.log("RECEIVED REGISTER PAYLOAD:", {
//       name,
//       employeeNo,
//       email,
//       role,
//     });

//     // Validate required fields
//     if (!name || !employeeNo || !password) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Name, Employee No, and password are required.",
//         },
//         { status: 400 }
//       );
//     }

//     await connectToDatabase();

//     // Check if user already exists by Name
//     const existingUser = await User.findOne({ name });
//     if (existingUser) {
//       return NextResponse.json(
//         { success: false, message: "User with this name already exists." },
//         { status: 400 }
//       );
//     }

//     // Check if Employee Number is already taken
//     const existingEmpNo = await User.findOne({ employeeNo });
//     if (existingEmpNo) {
//       return NextResponse.json(
//         { success: false, message: "Employee Number already registered." },
//         { status: 400 }
//       );
//     }

//     // 🛡️ ADMIN LIMIT LOGIC: Maximum 2 Admins allowed
//     const assignedRole = role || "employee";

//     if (assignedRole === "admin") {
//       const adminCount = await User.countDocuments({ role: "admin" });

//       if (adminCount >= 2) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: "Admin limit reached! Only 2 admin users are allowed.",
//           },
//           { status: 403 }
//         );
//       }
//     }

//     const salt = await bcrypt.genSalt(10);
//     const hashedPassword = await bcrypt.hash(password, salt);

//     // 🔑 Create user with validated data
//     const newUser = await User.create({
//       name,
//       employeeNo,
//       email,
//       password: hashedPassword,
//       role: assignedRole,
//     });

//     console.log("SAVED USER IN DB:", newUser);

//     return NextResponse.json(
//       {
//         success: true,
//         user: {
//           id: newUser._id,
//           name: newUser.name,
//           employeeNo: newUser.employeeNo,
//           role: newUser.role,
//         },
//       },
//       { status: 201 }
//     );
//   } catch (error: any) {
//     console.error("Register Error:", error);
//     return NextResponse.json(
//       { success: false, message: error.message },
//       { status: 500 }
//     );
//   }
// }