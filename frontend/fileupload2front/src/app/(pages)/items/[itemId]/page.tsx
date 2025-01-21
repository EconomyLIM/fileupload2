import axios from "axios";
import '@/app/globals.css'
import {Item, ItemFindByResponse} from "@/app/_component/items/itemId/interface/interface";
// export const dynamic = "force-dynamic";

export default async function ItemDetailPage ({params}: {
    params: Promise<{ itemId: string }>;
}){
    const { itemId } = await params;
    // 1) 서버 사이드에서 axios로 백엔드 API 호출
    const response = await axios.get(`http://localhost:8080/api/items/${itemId}`);

    const responseData: ItemFindByResponse = response.data;
    const itemData: Item = responseData.item;

    // 2) 데이터가 없을 때 예외 처리
    if (!itemData) {
        return (
            <div className="bg-gray-100 min-h-screen flex items-center justify-center">
                <p className="text-xl text-gray-600">해당 상품을 찾을 수 없습니다.</p>
            </div>
        );
    }

    return(
        <>
            <div className="bg-gray-100 min-h-screen">
                <div className="container mx-auto px-4 py-8">
                    <div className="mb-8 text-center">
                        <h2 className="text-3xl font-bold text-gray-800">상품 조회</h2>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        {/* 상품명 */}
                        <div className="mb-4">
                            <span className="text-lg font-medium text-gray-700">상품명: </span>
                            <span className="text-lg text-gray-900">{itemData.itemName}</span>
                        </div>

                        {/* 이미지 리스트 */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {responseData.uploadFiles?.map((file, idx) => (
                                <img
                                    key={idx}
                                    src={`/images/${file.storeFileName}`} // 예: /images/abc123.jpg
                                    alt="상품 이미지"
                                    className="w-full h-64 object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}