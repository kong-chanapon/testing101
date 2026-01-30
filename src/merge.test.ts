import { merge } from './merge';

describe('merge function', () => {
  describe('Basic functionality', () => {
    test('should merge three sorted arrays correctly', () => {
      const collection_1 = [1, 3, 5, 7];
      const collection_2 = [8, 6, 4, 2]; // sorted descending
      const collection_3 = [0, 2, 4, 6];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      // ตรวจสอบว่าผลลัพธ์เรียงจากน้อยไปมาก
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
      
      // ตรวจสอบว่ามีจำนวน elements ถูกต้อง
      expect(result.length).toBe(collection_1.length + collection_2.length + collection_3.length);
    });

    test('should handle arrays with single element', () => {
      const collection_1 = [5];
      const collection_2 = [3];
      const collection_3 = [7];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result).toEqual([3, 5, 7]);
      expect(result.length).toBe(3);
    });

    test('should merge arrays with duplicate values', () => {
      const collection_1 = [1, 3, 5];
      const collection_2 = [5, 3, 1]; // descending
      const collection_3 = [2, 3, 4];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      // ตรวจสอบว่าเรียงลำดับถูกต้อง
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
      expect(result.length).toBe(9);
    });
  });

  describe('Edge cases', () => {
    test('should handle empty arrays', () => {
      const collection_1: number[] = [];
      const collection_2: number[] = [];
      const collection_3: number[] = [];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    test('should handle when only collection_1 has elements', () => {
      const collection_1 = [1, 2, 3];
      const collection_2: number[] = [];
      const collection_3: number[] = [];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result.length).toBe(3);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });

    test('should handle when only collection_2 has elements', () => {
      const collection_1: number[] = [];
      const collection_2 = [5, 3, 1]; // descending
      const collection_3: number[] = [];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result.length).toBe(3);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });

    test('should handle when only collection_3 has elements', () => {
      const collection_1: number[] = [];
      const collection_2: number[] = [];
      const collection_3 = [1, 2, 3];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result.length).toBe(3);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });

    test('should handle arrays with zero values', () => {
      const collection_1 = [0, 1, 2];
      const collection_2 = [3, 2, 0]; // descending
      const collection_3 = [0, 1, 3];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result.length).toBe(9);
      expect(result[0]).toBe(0); // ค่าน้อยที่สุดควรเป็น 0
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });

    test('should handle minimum value of 0', () => {
      const collection_1 = [0, 2, 5, 10];
      const collection_2 = [15, 8, 3, 0]; // descending
      const collection_3 = [0, 1, 6, 9];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result.length).toBe(12);
      expect(result[0]).toBeGreaterThanOrEqual(0); // ค่าน้อยที่สุดต้องไม่ติดลบ
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });
  });

  describe('Different array sizes', () => {
    test('should handle arrays of different lengths', () => {
      const collection_1 = [1, 5];
      const collection_2 = [10, 8, 6, 4, 2]; // descending
      const collection_3 = [3, 7, 9];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result.length).toBe(10);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });

    test('should handle when one array is much longer', () => {
      const collection_1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
      const collection_2 = [5, 3]; // descending
      const collection_3 = [2];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result.length).toBe(13);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });
  });

  describe('Special cases', () => {
    test('should handle all same values', () => {
      const collection_1 = [5, 5, 5];
      const collection_2 = [5, 5, 5];
      const collection_3 = [5, 5, 5];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result.length).toBe(9);
      expect(result.every(val => val === 5)).toBe(true);
    });

    test('should handle large numbers', () => {
      const collection_1 = [100, 200, 300];
      const collection_2 = [1000, 500, 50]; // descending
      const collection_3 = [150, 250, 350];
      
      const result = merge(collection_1, collection_2, collection_3);
      
      expect(result.length).toBe(9);
      for (let i = 0; i < result.length - 1; i++) {
        expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
      }
    });
  });
});
