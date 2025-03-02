import { FormEvent, useState } from 'react';
import { Project } from '../types';

interface ProjectFormProps {
  initialData?: Partial<Project>;
  onSubmit: (data: { name: string; description: string; websocketUrl: string }) => void;
  onCancel: () => void;
}

export default function ProjectForm({ initialData, onSubmit, onCancel }: ProjectFormProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [websocketUrl, setWebsocketUrl] = useState(initialData?.websocketUrl || '');
  
  const [errors, setErrors] = useState<{
    name?: string;
    websocketUrl?: string;
  }>({});

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // 验证表单
    const newErrors: {
      name?: string;
      websocketUrl?: string;
    } = {};
    
    if (!name.trim()) {
      newErrors.name = '项目名称不能为空';
    }
    
    if (!websocketUrl.trim()) {
      newErrors.websocketUrl = 'WebSocket URL不能为空';
    } else if (!websocketUrl.startsWith('ws://') && !websocketUrl.startsWith('wss://')) {
      newErrors.websocketUrl = 'WebSocket URL必须以ws://或wss://开头';
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    onSubmit({
      name: name.trim(),
      description: description.trim(),
      websocketUrl: websocketUrl.trim()
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
          项目名称 <span className="text-red-500">*</span>
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
          项目描述
        </label>
        <div className="mt-2">
          <textarea
            id="description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
          />
        </div>
      </div>

      <div>
        <label htmlFor="websocketUrl" className="block text-sm font-medium leading-6 text-gray-900">
          WebSocket URL <span className="text-red-500">*</span>
        </label>
        <div className="mt-2">
          <input
            type="text"
            id="websocketUrl"
            value={websocketUrl}
            onChange={(e) => setWebsocketUrl(e.target.value)}
            placeholder="ws://example.com/socket"
            className={`block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ${
              errors.websocketUrl ? 'ring-red-500' : 'ring-gray-300'
            } focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6`}
          />
          {errors.websocketUrl && <p className="mt-2 text-sm text-red-600">{errors.websocketUrl}</p>}
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
