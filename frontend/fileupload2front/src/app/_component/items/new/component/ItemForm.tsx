"use client";

// 초기 상태 설정
import {ItemSaveResponse, ItemsInterface} from "@/app/_component/items/new/interface/itemsInterface";
import {useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";

const initialState: ItemsInterface = {
    itemName: "",
    imageFiles: null,
};

const ItemForm: React.FC = () => {
    const [formData, setFormData] = useState<ItemsInterface>(initialState);
    const router = useRouter();

    // 텍스트 입력 변경 핸들러
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 파일 입력 변경 핸들러 (실제 File 데이터를 저장)
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFormData((prev) => ({
                ...prev,
                imageFiles: event.target.files,
            }));
        }
    };

    // 폼 제출 핸들러
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // FormData 객체 생성
        const data = new FormData();
        data.append("itemName", formData.itemName);

        // imageFiles가 존재하면, 파일 목록의 각 파일을 FormData에 추가
        if (formData.imageFiles) {
            Array.from(formData.imageFiles).forEach((file) => {
                data.append("imageFiles", file);
            });
        }

        try {
            const response = await axios.post("/api/items/new", data, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log(response);
            const responseData : ItemSaveResponse = response.data;
            if (responseData.code === "OK"){
                alert("등록 성공했습니다.");
                router.push(`/items/${responseData.itemId}`)
            }

            // 등록 성공 시 추가 작업 (예: 알림, 페이지 이동 등)
        } catch (error) {
            console.error("등록 실패:", error);
            // 에러 처리 로직 추가
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <div className="container mx-auto px-4 py-8">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-bold text-gray-800">상품 등록</h2>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <form
                        onSubmit={handleSubmit}
                        encType="multipart/form-data"
                        className="space-y-6"
                    >
                        <div>
                            <label
                                htmlFor="itemName"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                상품명
                            </label>
                            <input
                                type="text"
                                name="itemName"
                                id="itemName"
                                placeholder="상품명을 입력하세요"
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                                value={formData.itemName}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="imageFiles"
                                className="block text-gray-700 font-medium mb-2"
                            >
                                이미지 파일들
                            </label>
                            <input
                                type="file"
                                multiple
                                name="imageFiles"
                                id="imageFiles"
                                className="block w-full text-gray-700"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="text-center">
                            <input
                                type="submit"
                                value="등록"
                                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 cursor-pointer"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ItemForm;