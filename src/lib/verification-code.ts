// 인증 코드 저장
declare global {
  // eslint-disable-next-line no-var
  var verificationCodes:
    | Map<string, { code: string; expiresAt: number }>
    | undefined;
}

// global 객체에 Map이 없으면 생성
const getVerificationCodes = () => {
  if (!global.verificationCodes) {
    global.verificationCodes = new Map<
      string,
      { code: string; expiresAt: number }
    >();
  }
  return global.verificationCodes;
};

// 만료된 코드 정리 함수
function cleanupExpiredCodes() {
  const verificationCodes = getVerificationCodes();
  const now = Date.now();
  for (const [email, data] of verificationCodes.entries()) {
    if (now > data.expiresAt) {
      verificationCodes.delete(email);
    }
  }
}

// 인증 코드 저장
export function setVerificationCode(
  email: string,
  code: string,
  expiresInMinutes: number = 10,
) {
  cleanupExpiredCodes();
  const verificationCodes = getVerificationCodes();
  const expiresAt = Date.now() + expiresInMinutes * 60 * 1000;
  verificationCodes.set(email, { code, expiresAt });
}

// 인증 코드 검증 및 삭제
export function verifyAndDeleteCode(email: string, code: string): boolean {
  cleanupExpiredCodes();
  const verificationCodes = getVerificationCodes();
  const stored = verificationCodes.get(email);

  if (!stored) {
    return false;
  }

  // 만료 확인
  if (Date.now() > stored.expiresAt) {
    verificationCodes.delete(email);
    return false;
  }

  // 코드 일치 확인
  if (stored.code !== code) {
    return false;
  }

  // 검증 성공 시 코드 삭제 (일회용)
  verificationCodes.delete(email);
  return true;
}
