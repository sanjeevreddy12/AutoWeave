require("dotenv").config();
import { Kafka } from "kafkajs";
import prisma, { JsonObject } from "@repo/db"
import { Parse } from "./parser";
import { sendEmail } from "./email";
const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId : 'outbox-processor',
    brokers: ['localhost:9092']
})

async function main()
{
    const consumer  = kafka.consumer({groupId : 'main-worker'});
    await consumer.connect();

    const producer = kafka.producer();
    await producer.connect()
    await consumer.subscribe({topic : TOPIC_NAME , fromBeginning : true});

    await consumer.run({
        autoCommit: false,
        eachMessage : async ({topic,partition,message})=>{
            console.log({
                partition,
                offset:message.offset,
                value : message.value?.toString(),
            })
            if (!message.value?.toString()) {
                return
            }
            
            const parsedvalue = JSON.parse(message.value?.toString());
            const zapRunId = parsedvalue.zapRunId;
            const stage = parsedvalue.stage;
            const zapRundetails = await prisma.zapRun.findFirst({
                where: {
                    id : zapRunId
                },
                include: {
                    zap: {
                        include: {
                            actions: {
                                include: {
                                     type : true
                                 }
                             }
                        }
                    }
                    
                    
                }
            })

            const currentaction = zapRundetails?.zap.actions.find(x => x.sortringOrder === stage);
            if (!currentaction) {
                console.log("No actions found for this order")
                return;
            }
            if (currentaction.type.id === "email") {
                const zapRunMetadata = zapRundetails?.metadata; 
                
                const body = Parse((currentaction.metadata as JsonObject)?.body as string,zapRunMetadata);
                const to = Parse((currentaction.metadata as JsonObject)?.email as string,zapRunMetadata);
                console.log(`sending out email to ${to} body is ${body}`)
                await sendEmail(to, body);
            }

            if (currentaction.type.id === "send-sol") {
                
            }

            

            await new Promise(r => setTimeout(r, 100));
            
            const zapId = message.value?.toString();
            const laststage = (zapRundetails?.zap.actions.length || 1) - 1;
            if (laststage !== stage) {
                await producer.send({
                    topic: TOPIC_NAME,
                    messages: [{
                        value: JSON.stringify({
                            stage: stage + 1,
                            zapRunId
                        })
                    }]
                })
                
            }

            await consumer.commitOffsets([{
                topic : TOPIC_NAME,
                partition : partition,
                offset: (parseInt(message.offset)+1).toString()
            }])
        }
    })
    
}
main()