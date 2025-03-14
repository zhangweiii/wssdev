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
    // Show confirmation
    setShowClearDataConfirm(true);
  };
  
  const handleConfirmClearData = () => {
    // Clear local storage
    localStorage.removeItem('websocket-manager-storage');
    // Reload page
    window.location.reload();
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="mt-2 text-sm text-gray-700">Configure WebSocket Testing Tool</p>
        </div>
      </div>
      
      <div className="mt-8 space-y-10 divide-y divide-gray-900/10">
        {/* General Settings */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">General Settings</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Basic application configuration options
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="max-w-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium leading-6 text-gray-900">Dark Mode</h3>
                    <p className="mt-1 text-sm text-gray-500">Enable dark mode to reduce eye strain when using at night</p>
                  </div>
                  <Switch
                    checked={darkMode}
                    onChange={setDarkMode}
                    className={classNames(
                      darkMode ? 'bg-primary-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Use dark mode</span>
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
                    <h3 className="text-sm font-medium leading-6 text-gray-900">Auto Reconnect</h3>
                    <p className="mt-1 text-sm text-gray-500">Automatically try to reconnect after disconnection</p>
                  </div>
                  <Switch
                    checked={autoReconnect}
                    onChange={setAutoReconnect}
                    className={classNames(
                      autoReconnect ? 'bg-primary-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Automatically try to reconnect after disconnection</span>
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

        {/* Message Settings */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Message Settings</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Configure message storage and display options
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="max-w-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-medium leading-6 text-gray-900">Save Message History</h3>
                    <p className="mt-1 text-sm text-gray-500">Keep message history after closing the page</p>
                  </div>
                  <Switch
                    checked={saveMessages}
                    onChange={setSaveMessages}
                    className={classNames(
                      saveMessages ? 'bg-primary-600' : 'bg-gray-200',
                      'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2'
                    )}
                  >
                    <span className="sr-only">Keep message history after closing the page</span>
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
                      Number of Messages to Save
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
                    <p className="mt-1 text-sm text-gray-500">Set the maximum number of messages to save (10-1000)</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
          <div className="px-4 sm:px-0">
            <h2 className="text-base font-semibold leading-7 text-gray-900">Data Management</h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Manage data stored by the application
            </p>
          </div>

          <div className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
            <div className="px-4 py-6 sm:p-8">
              <div className="max-w-2xl space-y-6">
                <div>
                  <h3 className="text-sm font-medium leading-6 text-gray-900">Clear All Data</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Remove all saved projects, signals, and settings from this browser
                  </p>
                  <div className="mt-3">
                    <button
                      type="button"
                      onClick={handleClearData}
                      className="inline-flex items-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Clear All Data
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Confirmation Dialog */}
      {showClearDataConfirm && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                  </svg>
                </div>
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  <h3 className="text-base font-semibold leading-6 text-gray-900">Clear All Data</h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to clear all data? This action cannot be undone and will remove all your projects, signals, and settings.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                  onClick={handleConfirmClearData}
                >
                  Clear Data
                </button>
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                  onClick={() => setShowClearDataConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
