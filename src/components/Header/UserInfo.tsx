import React from "react";

import { useUser } from "@/contexts/UserContext";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";

const UserInfo = () => {
  const { user, logout, isLoading } = useUser();

  if (isLoading) {
    return null;
  }

  if (!user) {
    return null; // LoginSignupModal이 표시됨
  }

  return (
    <div className="flex items-center justify-between gap-3 px-3 py-2">
      <span className="text-[#6B7280] text-gray-700 lg:text-3xl lg:text-gray-700">
        {user.nickname || user.email}
      </span>
      <Button
        size="sm"
        onClick={logout}
        className="bg-gray-500 hover:bg-gray-400"
      >
        <LogOut />
        <span className="lg:hidden">Logout</span>
      </Button>
    </div>
  );
};

export default UserInfo;
