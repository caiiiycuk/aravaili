export function log(message: string) {
    console.log("[INFO]: " + message);
}

export function fatal(message: string) {
    console.error("[FATAL]: " + message);
    process.exit(-1);
}
