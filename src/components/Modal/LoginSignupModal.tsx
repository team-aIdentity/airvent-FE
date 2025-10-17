import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Eye, EyeOff, User } from "lucide-react";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";

interface LoginSignupModalProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  mode: string;
  setMode: (mode: "login" | "signup") => void;
}

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({
  setIsMobileMenuOpen,
  isModalOpen,
  setIsModalOpen,
  mode,
  setMode,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`block flex w-full cursor-pointer justify-start gap-1 rounded-md px-3 py-2 text-base font-medium transition-colors lg:w-fit`}
          onClick={() => {
            // setIsMobileMenuOpen(false);
            setIsModalOpen(true);
          }}
        >
          <User />
          Sign in
        </Button>
      </DialogTrigger>
      {mode === "login" ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Welcome to Airvent</DialogTitle>
            <DialogDescription>
              Sign in to access your DePIN dashboard and manage your devices
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full flex-col items-center gap-5">
            <div className="text-lg font-bold">Sign in with Email</div>
            <div className="flex w-full flex-col gap-4">
              <Input placeholder="Email" className="w-full" />
              <div className="relative w-full">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  tabIndex={-1}
                  className="absolute top-1/2 right-3 -translate-y-1/2 text-[#6B7280] outline-none hover:text-[#111827]"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                  <Checkbox />
                  Remember me
                </div>
                <div className="cursor-pointer text-sm font-semibold text-[#10B981] hover:underline">
                  Forgot password?
                </div>
              </div>
            </div>
            <Button
              size="lg"
              className="w-full bg-[#111827] hover:bg-[#111827]/90"
            >
              Sign In
            </Button>
          </div>

          <DialogFooter>
            <div className="flex flex-col gap-4">
              <div className="text-sm">
                Don't have an account?{" "}
                <span
                  className="cursor-pointer font-bold text-[#10B981] hover:underline"
                  onClick={() => setMode("signup")}
                >
                  Create account
                </span>
              </div>
              <div className="flex flex-col gap-2 text-xs">
                <div>By signing in, you agree to our</div>
                <div>
                  <span className="cursor-pointer font-semibold text-[#10B981] hover:underline">
                    Terms of Service{" "}
                  </span>
                  and{" "}
                  <span className="cursor-pointer font-semibold text-[#10B981] hover:underline">
                    Privacy Policy
                  </span>
                </div>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an account</DialogTitle>
            <DialogDescription>
              If you've registered on the Airvent mobile app, use the same email
              to sync your rewards and mining data
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full flex-col items-center gap-8">
            {step === 1 && (
              <>
                <div className="flex w-full flex-col gap-2">
                  <Input placeholder="Email" className="w-full" />
                  <div className="relative w-full">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      className="w-full pr-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-[#6B7280] outline-none hover:text-[#111827]"
                      onClick={() => setShowPassword((prev) => !prev)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  <div className="relative w-full">
                    <Input
                      type={showRePassword ? "text" : "password"}
                      placeholder="RePassword"
                      className="w-full pr-10"
                      value={rePassword}
                      onChange={(e) => setRePassword(e.target.value)}
                    />
                    <button
                      type="button"
                      tabIndex={-1}
                      className="absolute top-1/2 right-3 -translate-y-1/2 text-[#6B7280] outline-none hover:text-[#111827]"
                      onClick={() => setShowRePassword((prev) => !prev)}
                      aria-label={
                        showRePassword ? "Hide password" : "Show password"
                      }
                    >
                      {showRePassword ? (
                        <EyeOff size={16} />
                      ) : (
                        <Eye size={16} />
                      )}
                    </button>
                  </div>
                </div>
                <Input placeholder="NickName" className="w-full" />
                <Button
                  size="lg"
                  className="w-full bg-[#111827] hover:bg-[#111827]/90"
                  onClick={() => setStep(2)}
                >
                  Next
                </Button>
              </>
            )}
            {step === 2 && (
              <>
                <Input placeholder="6 Code" className="w-full" />
                <Button
                  size="lg"
                  className="w-full bg-[#111827] hover:bg-[#111827]/90"
                  onClick={() => setStep(2)}
                >
                  Verify
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default LoginSignupModal;
