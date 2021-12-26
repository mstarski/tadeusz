import { MessagingService } from "./messaging.service";
import { connectionService } from "../connection";

export const messagingService = new MessagingService(connectionService);
