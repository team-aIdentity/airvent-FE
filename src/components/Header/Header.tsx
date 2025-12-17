"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@/contexts/UserContext";

import LoginSignupModal from "../Modal/LoginSignupModal";
import UserInfo from "./UserInfo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X } from "lucide-react";

import logo from "@/assets/Header/header_1.svg";

type NavItem = {
  name: string;
  content?: SubNavItem[];
  path?: string;
  url?: string;
};

type SubNavItem = {
  name: string;
  path?: string;
  url?: string;
};

const navItems: NavItem[] = [
  {
    name: "Product",
    content: [
      {
        name: "AirVentPro",
        path: "/product/pro",
      },
      {
        name: "AirVentTitan",
        path: "/product/titan",
      },
    ],
  },
  {
    name: "Dash Board",
    path: "/dashboard",
  },
  {
    name: "Q&A",
    url: "mailto:info@airventinc.co.kr",
  },
  {
    name: "Social",
    content: [
      {
        name: "Discord",
        url: "https://discord.gg/TqRsUwMmyR",
      },
      {
        name: "Telegram",
        url: "https://t.me/airventinccokr",
      },
      {
        name: "X",
        url: "https://x.com/airventinccokr",
      },
    ],
  },
];

const Header = () => {
  const pathname = usePathname();
  const { user, isLoading } = useUser();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<
    "login" | "signup" | "forgotPassword"
  >("login");

  const filteredNavItems = useMemo(() => {
    return navItems.filter((nav) => {
      if (nav.path === "/dashboard") {
        return !!user;
      }
      return true;
    });
  }, [user]);

  const isActive = (path: string) => {
    return pathname === path;
  };

  const handleLinkClick = (item: NavItem) => {
    if (item.path) return;
    if (item.url) window.open(item.url, "_blank");
  };

  const handleSubLinkClick = (subItem: SubNavItem) => {
    if (subItem.path) return;
    if (subItem.url) window.open(subItem.url, "_blank");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="w-full px-4 lg:px-20">
        <div className="flex h-20 items-center justify-between lg:h-36">
          {/* 로고 */}
          <div className="w-[30px] lg:hidden"></div>
          <div className="flex items-center lg:flex-none">
            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
              <img
                src={logo.src || logo}
                className="h-10 lg:h-14"
                alt="Airvent"
              />
            </Link>
          </div>

          <div className="hidden w-full items-center justify-end gap-8 lg:flex">
            {/* PC 네비게이션 */}
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                {filteredNavItems.map((nav, index) => (
                  <NavigationMenuItem key={index}>
                    {nav.content ? (
                      // 드롭다운 메뉴가 있는 경우
                      <>
                        <NavigationMenuTrigger>
                          {nav.name}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <div className="flex w-full flex-col">
                            {nav.content.map((subItem, subIndex) => (
                              <NavigationMenuLink key={subIndex} asChild>
                                {subItem.path ? (
                                  <Link
                                    href={subItem.path}
                                    className={`hover:text-accent-foreground focus:text-accent-foreground block space-y-1 p-4 text-center leading-none text-[#6B7280] no-underline transition-colors outline-none select-none ${
                                      isActive(subItem.path)
                                        ? "text-accent-foreground"
                                        : ""
                                    }`}
                                  >
                                    <div className="text-xl leading-none">
                                      {subItem.name}
                                    </div>
                                  </Link>
                                ) : (
                                  <button
                                    onClick={() => handleSubLinkClick(subItem)}
                                    className="hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block w-full space-y-1 p-4 text-center leading-none text-[#6B7280] no-underline transition-colors outline-none select-none"
                                  >
                                    <div className="text-xl leading-none">
                                      {subItem.name}
                                    </div>
                                  </button>
                                )}
                              </NavigationMenuLink>
                            ))}
                          </div>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      // 직접 링크인 경우
                      <NavigationMenuLink asChild>
                        {nav.path ? (
                          <Link
                            href={nav.path}
                            className={`hover:text-accent-foreground focus:text-accent-foreground block flex h-9 justify-center space-y-1 p-3 leading-none text-[#6B7280] no-underline transition-colors outline-none select-none ${
                              isActive(nav.path) ? "text-accent-foreground" : ""
                            }`}
                          >
                            {nav.name}
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleLinkClick(nav)}
                            className="hover:text-accent-foreground focus:text-accent-foreground block flex h-9 justify-center space-y-1 p-3 leading-none text-[#6B7280] no-underline transition-colors outline-none select-none"
                          >
                            {nav.name}
                          </button>
                        )}
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

            {!isLoading && user ? (
              <UserInfo />
            ) : (
              <LoginSignupModal
                setIsMobileMenuOpen={setIsMobileMenuOpen}
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                mode={modalMode}
                setMode={setModalMode}
              />
            )}
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div
            className="text-[#6B7280] lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="메뉴 열기/닫기"
          >
            {isMobileMenuOpen ? <X size={30} /> : <Menu size={30} />}
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-1 border-t bg-white px-2 pt-4 pb-3">
              <div>
                {!isLoading && user ? (
                  <UserInfo />
                ) : (
                  <LoginSignupModal
                    setIsMobileMenuOpen={setIsMobileMenuOpen}
                    isModalOpen={isModalOpen}
                    setIsModalOpen={setIsModalOpen}
                    mode={modalMode}
                    setMode={setModalMode}
                  />
                )}
              </div>
              {filteredNavItems.map((nav, index) => (
                <div key={index}>
                  {nav.content ? (
                    <div>
                      <div className="px-3 py-2 text-base font-medium text-gray-700">
                        {nav.name}
                      </div>
                      <div className="space-y-1 pl-6">
                        {nav.content.map((subItem, subIndex) => (
                          <div key={subIndex}>
                            {subItem.path ? (
                              <Link
                                href={subItem.path}
                                className={`block rounded-md px-3 py-2 text-sm transition-colors ${
                                  isActive(subItem.path)
                                    ? "bg-accent text-accent-foreground"
                                    : "text-foreground hover:bg-accent hover:text-accent-foreground"
                                }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                {subItem.name}
                              </Link>
                            ) : (
                              <button
                                onClick={() => {
                                  handleSubLinkClick(subItem);
                                  setIsMobileMenuOpen(false);
                                }}
                                className="text-foreground hover:bg-accent hover:text-accent-foreground block w-full rounded-md px-3 py-2 text-left text-sm transition-colors"
                              >
                                {subItem.name}
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    // 모바일에서 직접 링크
                    <div>
                      {nav.path ? (
                        <Link
                          href={nav.path}
                          className={`block rounded-md px-3 py-2 text-base font-medium text-gray-700 transition-colors ${
                            isActive(nav.path)
                              ? "bg-accent text-accent-foreground"
                              : "text-foreground hover:bg-accent hover:text-accent-foreground"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {nav.name}
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            handleLinkClick(nav);
                            setIsMobileMenuOpen(false);
                          }}
                          className="hover:bg-accent hover:text-accent-foreground block w-full rounded-md px-3 py-2 text-left text-base font-medium text-gray-700 transition-colors"
                        >
                          {nav.name}
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
