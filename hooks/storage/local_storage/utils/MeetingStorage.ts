import BasicStorage from "@/hooks/storage/local_storage/utils/BasicStorage";
import { MeetingDataType } from "@/constants/types/CustomTypes";

export default class MeetingStorage extends BasicStorage<MeetingDataType>{
  constructor() {
    super(
      {
        storageKey: 'meetings',
        primaryKeyPropertyName: 'title',
        noPrimaryKeyError: "The meeting title is required.",
        notUniqueError: "You already have a meeting with this title.",
        notFoundError: "There was an error finding your meeting.",
      }
    )
  }
}
