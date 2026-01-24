import { WebSocketServer } from "ws";
import { prisma } from "db/client";

type MessageType =
    | {
        type: "get";
        id: number;
    }
    | {
        type: "create";
        username: string;
        password: string;
    };

const wss = new WebSocketServer({ port: 3002 });

wss.on("connection", (ws) => {
    ws.send("connected");

    ws.on("message", async (message) => {
        const msg: MessageType = JSON.parse(message.toString());
        try {

            if (msg.type === "get") {
                const user = await prisma.user.findUnique({
                    where: {
                        id: msg.id
                    }
                });

                if (user) {
                    ws.send(JSON.stringify(user));
                }
            }

            if (msg.type === "create") {
                const user = await prisma.user.create({
                    data: {
                        username: msg.username,
                        password: msg.password
                    }
                });

                ws.send(JSON.stringify(user));
            }
        } catch (error) {
            console.log(error);
            ws.send(JSON.stringify({ error }));
        }
    });
});
