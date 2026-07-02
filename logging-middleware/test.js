const { Log } = require("./index");

async function testLogger() {
    const result = await Log(
        "backend",
        "info",
        "handler",
        "Logger test successful"
    );

    console.log(result);
}

testLogger();