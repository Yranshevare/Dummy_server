export default async function latency(time:number) {
    await new Promise((resolve) => setTimeout(resolve, time));
} 