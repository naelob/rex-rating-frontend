const { createLightNode } = require("@waku/sdk");
const { protobuf } = require("protobufjs");
const { Protocols } = require("@waku/sdk");
//import * as waku from "https://unpkg.com/@waku/sdk@latest/bundle/index.js";


async function waitForRemotePeer(node, protocols) {
  return new Promise((resolve) => {
    const interval = setInterval(async () => {
      const peers = await node.peersForProtocols(protocols);
      if (peers.length > 0) {
        clearInterval(interval);
        resolve();
      }
    }, 1000);
  });
}

async function main() {

    try {
        // Create and start a Light Node
        const node = await createLightNode({ defaultBootstrap: true });
        await node.start();
    
        // Use the stop() function to stop a running node
        // await node.stop();
    
        // Wait for peer connections with specific protocols
        await waitForRemotePeer(node, [
            Protocols.LightPush,
            Protocols.Filter,
        ]);
    
        const contentTopic = "/light-guide/1/message/proto";
    
        // Create a message encoder and decoder
        const encoder = createEncoder({ contentTopic });
        const decoder = createDecoder(contentTopic);
    
    
    
        // Create a message structure using Protobuf
        const ChatMessage = new protobuf.Type("ChatMessage")
            .add(new protobuf.Field("timestamp", 1, "uint64"))
            .add(new protobuf.Field("sender", 2, "string"))
            .add(new protobuf.Field("message", 3, "string"));
    
    
        // Create a new message object
        const protoMessage = ChatMessage.create({
            timestamp: Date.now(),
            sender: "Alice",
            message: "Hello, World!",
        });
    
        // Serialise the message using Protobuf
        const serialisedMessage = ChatMessage.encode(protoMessage).finish();
    
    
        // Create the callback function
        const callback = (wakuMessage) => {
            // Check if there is a payload on the message
            if (!wakuMessage.payload) return;
            // Render the messageObj as desired in your application
            const messageObj = ChatMessage.decode(wakuMessage.payload);
            console.log(messageObj);
        };
    
        // Create a filter subscription
        const subscription = await node.filter.createSubscription();
    
        // Subscribe to content topics and process new messages
        await subscription.subscribe([decoder], callback);
    
        // Send the message using Light Push
        await node.lightPush.send(encoder, {
            payload: serialisedMessage,
        });
    } catch (error) {
      console.error("An error occurred:", error);
    }
}

main();