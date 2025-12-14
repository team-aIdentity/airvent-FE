import React, { useEffect, useState } from "react";
import { useUser } from "@/contexts/UserContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import { Eye, EyeOff, User2 } from "lucide-react";

interface LoginSignupModalProps {
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isModalOpen: boolean;
  setIsModalOpen: (isOpen: boolean) => void;
  mode: string;
  setMode: (mode: "login" | "signup") => void;
}

type FieldErrors = {
  email?: string;
  password?: string;
  rePassword?: string;
  verificationCode?: string;
};

const LoginSignupModal: React.FC<LoginSignupModalProps> = ({
  setIsMobileMenuOpen,
  isModalOpen,
  setIsModalOpen,
  mode,
  setMode,
}) => {
  const { login, signup } = useUser();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRePassword, setShowRePassword] = useState<boolean>(false);
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [verificationCode, setVerificationCode] = useState<string>("");
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false); // 추가
  const [step, setStep] = useState<number>(1);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isModalOpen) {
      setMode("login");
      setStep(1);
      setEmail("");
      setPassword("");
      setRePassword("");
      setNickname("");
      setVerificationCode("");
      setRememberMe(false);
      setErrors({});
    }
  }, [isModalOpen, setMode]);

  const validateEmail = (email: string): string | undefined => {
    if (!email) {
      return "Email is required";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }
    return undefined;
  };

  const validatePassword = (password: string): string | undefined => {
    if (!password) {
      return "Password is required";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long";
    }
    return undefined;
  };

  const validateRePassword = (
    rePassword: string,
    password: string,
  ): string | undefined => {
    if (!rePassword) {
      return "Please confirm your password";
    }
    if (rePassword !== password) {
      return "Passwords do not match";
    }
    return undefined;
  };

  const clearFieldError = (field: keyof FieldErrors) => {
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  const handleLogin = async () => {
    const newErrors: FieldErrors = {};

    const emailError = validateEmail(email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validatePassword(password);
    if (passwordError) newErrors.password = passwordError;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      await login(email, password, rememberMe);
      setIsModalOpen(false);
      setIsMobileMenuOpen(false);
    } catch (err: any) {
      setErrors({
        email: err.message?.includes("email") ? err.message : undefined,
        password:
          err.message?.includes("password") || err.message?.includes("Invalid")
            ? err.message
            : undefined,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    if (step === 1) {
      const newErrors: FieldErrors = {};

      const emailError = validateEmail(email);
      if (emailError) newErrors.email = emailError;

      const passwordError = validatePassword(password);
      if (passwordError) newErrors.password = passwordError;

      const rePasswordError = validateRePassword(rePassword, password);
      if (rePasswordError) newErrors.rePassword = rePasswordError;

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsSendingCode(true);
      setErrors({});

      try {
        const response = await fetch("/api/auth/send-verification-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Failed to send verification code");
        }

        // Step 2로 이동
        setStep(2);
        setErrors({});
      } catch (err: any) {
        setErrors({ email: err.message || "Failed to send verification code" });
      } finally {
        setIsSendingCode(false);
      }
    } else {
      // Step 2: 인증 코드 검증
      const newErrors: FieldErrors = {};

      if (!verificationCode) {
        newErrors.verificationCode = "Verification code is required";
      } else if (verificationCode.length !== 6) {
        newErrors.verificationCode = "Verification code must be 6 digits";
      }

      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }

      setIsLoading(true);
      setErrors({});

      try {
        // 인증 코드 검증
        const verifyResponse = await fetch("/api/auth/verify-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, code: verificationCode }),
        });

        if (!verifyResponse.ok) {
          const error = await verifyResponse.json();
          throw new Error(error.error || "Invalid verification code");
        }

        await signup(email, password, nickname || undefined);
        setMode("login");
        setStep(1);
        setErrors({});
      } catch (err: any) {
        // 서버 에러 처리
        if (err.message?.includes("email") || err.message?.includes("Email")) {
          setErrors({ email: err.message });
        } else if (
          err.message?.includes("code") ||
          err.message?.includes("verification")
        ) {
          setErrors({ verificationCode: err.message });
        } else {
          setErrors({ verificationCode: err.message || "Failed to sign up" });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      setErrors({ verificationCode: "Email is required" });
      return;
    }

    setIsSendingCode(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/send-verification-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to resend verification code");
      }
    } catch (err: any) {
      setErrors({ verificationCode: err.message || "Failed to resend code" });
    } finally {
      setIsSendingCode(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className={`hover:text-accent-foreground block flex w-full cursor-pointer justify-start gap-1 rounded-md px-3 py-2 text-base font-medium transition-colors hover:bg-transparent lg:w-fit lg:text-3xl lg:text-[#6B7280]`}
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          <User2 className="size-4 lg:size-8" />
          Sign in
        </Button>
      </DialogTrigger>
      <DialogContent>
        {mode === "login" ? (
          <>
            <DialogHeader>
              <DialogTitle>Welcome to Airvent</DialogTitle>
              <DialogDescription>
                Sign in to access your DePIN dashboard and manage your devices
              </DialogDescription>
            </DialogHeader>

            <div className="flex w-full flex-col items-center gap-5">
              <div className="text-lg font-bold">Sign in with Email</div>
              <div className="flex w-full flex-col gap-4">
                <Input
                  placeholder="Email"
                  className="w-full"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) clearFieldError("email");
                  }}
                  disabled={isLoading}
                />
                {errors.email && (
                  <span className="text-xs text-red-500">{errors.email}</span>
                )}
                <div className="relative w-full">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="w-full pr-10"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.password) clearFieldError("password");
                    }}
                    disabled={isLoading}
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
                  {errors.password && (
                    <span className="text-xs text-red-500">
                      {errors.password}
                    </span>
                  )}
                </div>
                <div className="flex justify-between">
                  {/* TODO: 쿠키 설정 */}
                  <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                    <Checkbox
                      checked={rememberMe}
                      onCheckedChange={(checked) =>
                        setRememberMe(checked === true)
                      }
                    />
                    Remember me
                  </div>
                  {/* TODO: 비밀번호 변경 로직 */}
                  <div className="cursor-pointer text-sm font-semibold text-[#10B981] hover:underline">
                    Forgot password?
                  </div>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full bg-[#111827] hover:bg-[#111827]/90"
                onClick={handleLogin}
                disabled={isLoading}
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
                    onClick={() => {
                      setMode("signup");
                      setErrors({});
                    }}
                  >
                    Create account
                  </span>
                </div>
                <div className="flex flex-col gap-2 text-xs">
                  <div>By signing in, you agree to our</div>
                  <div>
                    {/* TOOD: url 추가 */}
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
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Create an account</DialogTitle>
              <DialogDescription>
                If you've registered on the Airvent mobile app, use the same
                email to sync your rewards and mining data
              </DialogDescription>
            </DialogHeader>

            <div className="flex w-full flex-col items-center gap-8">
              {step === 1 ? (
                <>
                  <div className="flex w-full flex-col gap-2">
                    <Input
                      placeholder="Email"
                      className="w-full"
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) clearFieldError("email");
                      }}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <span className="text-xs text-red-500">
                        {errors.email}
                      </span>
                    )}
                    <div className="relative w-full">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password (At least 6 characters long)"
                        className="w-full pr-10"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          if (errors.password) clearFieldError("password");
                        }}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-[#6B7280] outline-none hover:text-[#111827]"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>{" "}
                      {errors.password && (
                        <span className="text-xs text-red-500">
                          {errors.password}
                        </span>
                      )}
                    </div>
                    <div className="relative w-full">
                      <Input
                        type={showRePassword ? "text" : "password"}
                        placeholder="RePassword"
                        className="w-full pr-10"
                        value={rePassword}
                        onChange={(e) => {
                          setRePassword(e.target.value);
                          if (errors.rePassword) clearFieldError("rePassword");
                        }}
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        tabIndex={-1}
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-[#6B7280] outline-none hover:text-[#111827]"
                        onClick={() => setShowRePassword((prev) => !prev)}
                      >
                        {showRePassword ? (
                          <EyeOff size={16} />
                        ) : (
                          <Eye size={16} />
                        )}
                      </button>{" "}
                      {errors.rePassword && (
                        <span className="text-xs text-red-500">
                          {errors.rePassword}
                        </span>
                      )}
                    </div>
                  </div>
                  <Input
                    placeholder="NickName"
                    className="w-full"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button
                    size="lg"
                    className="w-full bg-[#111827] hover:bg-[#111827]/90"
                    onClick={handleSignup}
                    disabled={isLoading}
                  >
                    Next
                  </Button>
                </>
              ) : (
                <>
                  <div className="w-full">
                    <div className="relative">
                      <Input
                        placeholder="6 Code"
                        className="w-full pr-20"
                        value={verificationCode}
                        disabled={isLoading}
                        onChange={(e) => {
                          setVerificationCode(e.target.value);
                          if (errors.verificationCode)
                            clearFieldError("verificationCode");
                        }}
                        maxLength={6}
                      />
                      {errors.verificationCode && (
                        <span
                          onClick={handleResendCode}
                          className="absolute top-1/2 right-3 flex -translate-y-1/2 cursor-pointer items-center text-sm font-semibold text-[#10B981] select-none hover:underline"
                        >
                          Resend
                        </span>
                      )}
                    </div>
                    {errors.verificationCode && (
                      <span className="text-xs text-red-500">
                        {errors.verificationCode}
                      </span>
                    )}
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-[#111827] hover:bg-[#111827]/90"
                    onClick={handleSignup}
                    disabled={isLoading}
                  >
                    Verify
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LoginSignupModal;
