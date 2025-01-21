import {CommonInterface} from "@/app/_component/common/response/Interface";

export interface ItemsInterface{
    itemName: string,
    imageFiles: FileList | null
}

export interface ItemSaveResponse extends CommonInterface{
    itemId: string
}