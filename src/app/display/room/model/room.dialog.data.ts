import { RoomUpdateRequest } from './room.update-request';

export interface RoomDialogData extends RoomUpdateRequest {
  isUpdate: boolean;
}
