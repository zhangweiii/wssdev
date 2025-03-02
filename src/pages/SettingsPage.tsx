import { useState } from 'react';
import { Switch } from '@headlessui/react';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [autoReconnect, setAutoReconnect] = useState(true);
  const [saveMessages, setSaveMessages] = useState(false);
  const [messagesToSave, setMessagesToSave] = useState(100);
  
  const [showClearDataConfirm, setShowClearDataConfirm] = useState(false);
  
  const handleClearData = () => {
    // 调用确认
    setShowClearDataConfirm(true);
  };
  
  const handleConfirmClearData = () => {
    // 清除本地存储
    localStorage.removeItem('websocket-manager-storage');
    // 重新加载页面
    window.location.reload();
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">设置</h1>
          <p className="mt-2 text-sm text-gray-700">配置WebSocket测试工具</p>
        </div>
      </div>
      
      <div className="mt-8 space-y-10 divide-y divide-gray-900/10">
        {/* 常规设置 */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">常规设置</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              基本应用配置选项
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="max-w-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium leading-6 text-gray-900">深色模式</h3>
                    <p className="mt-1 text-sm text-gray-500">启用深色模式以在夜间使用时减少眼睛疲劳</p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onChange={setDarkMode}
                    className={classNames(
                      darkMode ? 'bg-primary-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">使用深色模式</span>
                    <span
                      className={classNames(
                        darkMode ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    >
                      <span
                        className={classNames(
                          darkMode ? 'opacity-0 duration-100 ease-out' : 'opacity-100 duration-200 ease-in',
                          'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                        )}
                        aria-hidden="true"
                      >
                        <svg className="h-3 w-3 text-gray-400" fill="none" viewBox="0 0 12 12">
                          <path
                            d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                            stroke="currentColor"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      <span
                        className={classNames(
                          darkMode ? 'opacity-100 duration-200 ease-in' : 'opacity-0 duration-100 ease-out',
                          'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity'
                        )}
                        aria-hidden="true"
                      >
                        <svg className="h-3 w-3 text-primary-600" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
                        </svg>
                      </span>
                    </span>
                  </Switch>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium leading-6 text-gray-900">自动重连</h3>
                    <p className="mt-1 text-sm text-gray-500">断开连接后自动尝试重新连接</p>
                  </div>
                  <Switch
                    checked={autoReconnect}
                    onChange={setAutoReconnect}
                    className={classNames(
                      autoReconnect ? 'bg-primary-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">断开连接后自动尝试重新连接</span>
                    <span
                      className={classNames(
                        autoReconnect ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 消息设置 */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">消息设置</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              配置消息存储和显示选项
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="max-w-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium leading-6 text-gray-900">保存消息历史</h3>
                    <p className="mt-1 text-sm text-gray-500">关闭页面后保留消息历史记录</p>
                  </div>
                  <Switch
                    checked={saveMessages}
                    onChange={setSaveMessages}
                    className={classNames(
                      saveMessages ? 'bg-primary-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">关闭页面后保留消息历史记录</span>
                    <span
                      className={classNames(
                        saveMessages ? 'translate-x-5' : 'translate-x-0',
                        'pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out'
                      )}
                    />
                  </Switch>
                </div>
                
                {saveMessages && (
                  <div>
                    <label htmlFor="messagesToSave" className="block text-sm font-medium leading-6 text-gray-900">
                      保存消息数量
                    </label>
                    <div className="mt-2">
                      <input
                        type="number"
                        name="messagesToSave"
                        id="messagesToSave"
                        min="10"
                        max="1000"
                        value={messagesToSave}
                        onChange={(e) => setMessagesToSave(Number(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                    <p className="mt-1 text-sm text-gray-500">设置要保存的最大消息数量（10-1000）</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 数据管理 */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">数据管理</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              管理应用存储的数据
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-sm font-medium leading-6 text-gray-900">清除所有数据</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    删除所有存储的项目和信令。此操作无法撤销。
                  </p>
                  <div className="mt-4">
                    {!showClearDataConfirm ? (
                      <button
                        type="button"
                        onClick={handleClearData}
                        className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                      >
                        清除所有数据
                      </button>
                    ) : (
                      <div>
                        <p className="text-sm text-red-600 font-semibold mb-3">
                          确定要清除所有数据吗？此操作无法撤销。
                        </p>
                        <div className="flex space-x-3">
                          <button
                            type="button"
                            onClick={handleConfirmClearData}
                            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                          >
                            确认清除
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowClearDataConfirm(false)}
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          >
                            取消
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium leading-6 text-gray-900">导出数据</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    导出所有项目和信令数据为JSON文件
                  </p>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                    >
                      导出数据
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
