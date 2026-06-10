// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Field,
//   // FieldDescription,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import Image from "next/image";
// import Link from "next/link";

// export function LoginForm({
//   className,
//   ...props
// }: React.ComponentProps<"div">) {
//   return (
//     <div className={cn("flex flex-col gap-15", className)} {...props}>
//       <div className="flex items-center justify-center gap-5 ">
//         <Image src="/slt.png" alt="SLT Logo" width={40} height={30} />
//         <h1 className=" text-3xl text-blue-800 font-bold text-center">
//           WLTSERVICES
//         </h1>
//       </div>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-2xl font-bold">Login</CardTitle>
//           <CardDescription className="font-bold">
//             Please enter your username and password to login your account.
//           </CardDescription>
//         </CardHeader>
//         <CardContent className="mt-9">
//           <form>
//             <FieldGroup className="flex flex-col gap-9">
//               <Field>
//                 <FieldLabel htmlFor="email">Username</FieldLabel>
//                 <Input id="username" type="name" placeholder="" required />
//               </Field>
//               <Field>
//                 <div className="flex items-center">
//                   <FieldLabel htmlFor="password">Password</FieldLabel>
//                   <a
//                     href="#"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   ></a>
//                 </div>
//                 <Input
//                   id="password"
//                   type="password"
//                   autoComplete="new-password"
//                   required
//                 />
//               </Field>
//               <Field>
//                 <Button
//                   type="submit"
//                   className="bg-blue-500 hover:bg-blue-600 text-white border-0"
//                 >
//                   Login
//                 </Button>

//                 <Link
//                   href="/forgot-password"
//                   className="block mt-3 text-center text-sm text-gray-400 hover:text-blue-500 "
//                 >
//                   Forget your password?
//                 </Link>
//               </Field>
//             </FieldGroup>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
