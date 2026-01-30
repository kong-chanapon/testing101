// collection_1, collection_3 จะเรียงจากน้อยไปมากเสมอ
// collection_2 จะเรียงจากมากไปน้อยเสมอ
// min(0) จำนวนที่ตำที่สุดคือ 0
// ห้ามใช้ function sort ใดๆ
// return sorted array จากน้อยไปมาก


export function merge(collection_1: number[], collection_2: number[], collection_3: number[]): number[] {
let ans: number[] = [];

//reverse collection_2
collection_2 = collection_2.reverse()

//แนว pointer ชี้ array ทั้ง 3
let i = 0;
let j = 0;
let k = 0;

//loop เทียบค่าจนกว่า จะไปสุดทุกตัว
while (i < collection_1.length || j < collection_2.length || k < collection_3.length){
const temp: number[] = []
  if (i < collection_1.length){
    temp.push(collection_1[i]);
  }
  if (j < collection_2.length){
    temp.push(collection_2[j]);
  }
  if (k < collection_3.length){
    temp.push(collection_3[k]);
  }

  //หาค่าที่น้อยที่สุด
  const minValue = Math.min(...temp);
  ans.push(minValue);

  //เลื่อน pointer ตัวที่เอา min ออกไปข้างหน้า
  if (i < collection_1.length && collection_1[i] === minValue){
    i++;
  } else if (j < collection_2.length && collection_2[j] === minValue){
    j++;
  } else if (k < collection_3.length && collection_3[k] === minValue){
    k++;
  }
}


return ans;
}