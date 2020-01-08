export function log(message: any) {
    console.log("[INFO]: ", message);
}

export function fatal(message: any) {
    console.error("[FATAL]: ", message);
    process.exit(-1);
}
