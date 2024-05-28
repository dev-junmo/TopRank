let deviceType:string = "MOBILE";

export function templateUrlForDeviceType(url): string {
    if (deviceType == "MOBILE") {
        console.log("templateUrl", url);
    }
    return url;
}