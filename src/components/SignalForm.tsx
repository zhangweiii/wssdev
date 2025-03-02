import { FormEvent, useState } from 'react';
import { Signal } from '../types';

interface SignalFormProps {
  initialData?: Partial<Signal>;
  onSubmit: (data: { name: string; description: string; payload: string }) => void;
  onCancel: () => void;
}

export default function SignalForm({ initialData, onSubmit, onCancel }: SignalFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [payload, setPayload] = useState(initialData?.payload || '');
  
  const [errors, setErrors] = useState<{
    name?: string;
    payload?: string;
  }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    const newErrors: {
      name?: string;
      payload?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = '信令名称不能为空';
    }
    
    if (!payload.trim()) {
      newErrors.payload = '信令内容不能为空';
    } else {
      // 尝试验证JSON格式
      try {
        JSON.parse(payload);
      } catch (error) {
        // 允许非JSON格式的内容，但给出警告
        console.warn('信令内容不是有效的JSON格式');
      }
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      payload: payload.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          信令名称 <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.name ? 'ring-red-500' : 'ring-gray-300'
            } focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6`}
          />
          {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
          信令描述
        </label>
        <div className="mt-2">
          <textarea
            id="description"
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="payload" className="block text-sm font-medium leading-6 text-gray-900">
          信令内容 <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <textarea
            id="payload"
            rows={6}
            value={payload}
            onChange={(e) => setPayload(e.target.value)}
            placeholder='{"type": "message", "content": "Hello, WebSocket!"}'
            className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.payload ? 'ring-red-500' : 'ring-gray-300'
            } focus:ring-2 focus:ring-inset focus:ring-primary-600 font-mono text-sm sm:leading-6 whitespace-pre-wrap break-all`}
          />
          {errors.payload && <p className="mt-2 text-sm text-red-600">{errors.payload}</p>}
        </div>
      </div>

      <div className="flex justify-end gap-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          取消
        </button>
        <button
          type="submit"
          className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
        >
          保存
        </button>
      </div>
    </form>
  );
}
