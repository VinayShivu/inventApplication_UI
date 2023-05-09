export const TOKENDATA = "TOKENDATA";
export const SIDEBARTAB = "SIDEBARTAB";
export const BREADCRUMB = "BREADCRUMB";
export const USERNAME = "USERNAME";
export const EXPIRYTIME = "EXPIRYTIME";
export const REFRESHTOKEN = "REFRESHTOKEN";

export function updateToken(data: string) {
  return {
    type: TOKENDATA,
    payload: data,
  };
}

export function updateSidebarTab(data: string) {
  return {
    type: SIDEBARTAB,
    payload: data,
  };
}

export function updateBreadCrumb(data: any) {
  return {
    type: BREADCRUMB,
    payload: data,
  };
}

export function updateUserName(data: string) {
  return {
    type: USERNAME,
    payload: data,
  };
}

export function updateTokenExpiryTime(data: number) {
  return {
    type: EXPIRYTIME,
    payload: data,
  };
}

export function updateRefreshToken(data: string) {
  return {
    type: REFRESHTOKEN,
    payload: data,
  };
}
