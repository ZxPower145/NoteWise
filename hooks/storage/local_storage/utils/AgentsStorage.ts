import BasicStorage from "@/hooks/storage/local_storage/utils/BasicStorage";
import { AgentDataType } from "@/constants/types/CustomTypes";

export default class AgentsStorage extends BasicStorage<AgentDataType>{
  constructor() {
    super(
      {
        storageKey: "agents",
        primaryKeyPropertyName: "name",
        noPrimaryKeyError: "The Agent's name is required.",
        notUniqueError: "You already have an Agent with this name.",
        notFoundError: "There was an error finding your Agent."
      }
    )
  }
}
