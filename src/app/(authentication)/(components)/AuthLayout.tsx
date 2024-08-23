import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";


const AuthLayout = () => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
          <div className="flex flex-col items-center md:flex-row md:max-w-4xl md:rounded-lg bg-white shadow-md overflow-hidden">
            {/* Left Section */}
            <div className="flex-1 bg-teal-500 text-white p-8">
              <div className="flex flex-col items-center">
                <div className="text-left">
                  <h2 className="text-4xl font-bold mb-4">Sign in to</h2>
                  <p className="text-xl">
                    Lorem Ipsum is simply dummy text of the printing and typesetting
                    industry.
                  </p>
                </div>
                <div className="mt-6">
                  <img
                    src="/your-illustration.png" // replace with your actual image path
                    alt="Illustration"
                    className="w-64 h-auto"
                  />
                </div>
              </div>
            </div>
    
            {/* Right Section */}
            <div className="flex-1 p-8">
              <div className="flex flex-col items-center justify-center text-center">
                <CheckCircle className="text-green-500 w-16 h-16 mb-4" />
                <h1 className="text-2xl font-bold mb-2">Password Changed!</h1>
                <p className="text-gray-600 mb-6">
                  Your password has been changed successfully.
                </p>
                <Button
                  variant="default"
                  className="w-full"
                //   onClick={() => {
                //     // Add your navigation logic here
                //     console.log("Navigate to login");
                //   }}
                >
                  Back to Login
                </Button>
              </div>
            </div>
          </div>
        </div>
      );
}

export default AuthLayout