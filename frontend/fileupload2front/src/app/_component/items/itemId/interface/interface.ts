
export interface ItemData {
    itemName: string;
    fileList: {
        storeFileName: string;
    }[];
}

export interface Item{
    itemId: string
    , itemName: string
}

export interface UploadFile{
    id: string
    , uploadFileName: string
    , storeFileName: string
}

export interface ItemFindByResponse{
    code: string
    , message: string
    , item: Item
    , uploadFiles: UploadFile[]
}