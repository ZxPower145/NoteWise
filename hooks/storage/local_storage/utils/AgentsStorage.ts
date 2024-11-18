import BasicStorage from "@/hooks/storage/local_storage/utils/BasicStorage";

class AgentsStorage extends BasicStorage{
  constructor() {
    super(
      "agents",
      "name",
      "The Agent's name is required.",
      "You already have an Agent with this name.",
      "There was an error finding your Agent."
    )
  }
}

export default AgentsStorage
