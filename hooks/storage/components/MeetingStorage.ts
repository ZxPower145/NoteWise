import BasicStorage from "@/hooks/storage/BasicStorage";

class MeetingStorage extends BasicStorage{
  constructor() {
    super(
      'meetings',
      'title',
      "The meeting title is required.",
      "You already have a meeting with this title.",
      "There was an error finding your meeting.",
    );
  }
  
}

export default MeetingStorage
