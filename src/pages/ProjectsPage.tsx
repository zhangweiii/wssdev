import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import useStore from '../store';
import Modal from '../components/Modal';
import ProjectForm from '../components/ProjectForm';

export default function ProjectsPage() {
  const navigate = useNavigate();
  const { projects, addProject, updateProject, deleteProject, setCurrentProject } = useStore();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentEditingProject, setCurrentEditingProject] = useState<string | null>(null);
  const [currentDeletingProject, setCurrentDeletingProject] = useState<string | null>(null);
  
  const editingProject = currentEditingProject 
    ? projects.find(p => p.id === currentEditingProject) 
    : null;
    
  const deletingProject = currentDeletingProject 
    ? projects.find(p => p.id === currentDeletingProject) 
    : null;
  
  const handleAddProject = (data: { name: string; description: string; websocketUrl: string }) => {
    addProject({
      name: data.name,
      description: data.description,
      websocketUrl: data.websocketUrl,
    });
    setIsAddModalOpen(false);
  };
  
  const handleEditProject = (data: { name: string; description: string; websocketUrl: string }) => {
    if (currentEditingProject) {
      updateProject(currentEditingProject, {
        name: data.name,
        description: data.description,
        websocketUrl: data.websocketUrl,
      });
      setIsEditModalOpen(false);
      setCurrentEditingProject(null);
    }
  };
  
  const handleDeleteProject = () => {
    if (currentDeletingProject) {
      deleteProject(currentDeletingProject);
      setIsDeleteModalOpen(false);
      setCurrentDeletingProject(null);
    }
  };
  
  const openEditModal = (projectId: string) => {
    setCurrentEditingProject(projectId);
    setIsEditModalOpen(true);
  };
  
  const openDeleteModal = (projectId: string) => {
    setCurrentDeletingProject(projectId);
    setIsDeleteModalOpen(true);
  };
  
  const handleProjectClick = (projectId: string) => {
    setCurrentProject(projectId);
    navigate('/test');
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">项目管理</h1>
          <p className="mt-2 text-sm text-gray-700">创建并管理您的WebSocket项目</p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            新建项目
          </button>
        </div>
      </div>
      
      <div className="mt-8 overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
        {projects.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                  项目名称
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:table-cell">
                  WebSocket URL
                </th>
                <th scope="col" className="hidden px-3 py-3.5 text-left text-sm font-semibold text-gray-900 lg:table-cell">
                  创建时间
                </th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                  <span className="sr-only">操作</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50 cursor-pointer">
                  <td 
                    className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    <div>{project.name}</div>
                    <div className="text-xs text-gray-500 sm:hidden mt-1">{project.websocketUrl}</div>
                  </td>
                  <td 
                    className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    {project.websocketUrl}
                  </td>
                  <td 
                    className="hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell"
                    onClick={() => handleProjectClick(project.id)}
                  >
                    {new Date(project.createdAt).toLocaleString()}
                  </td>
                  <td className="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <div className="flex justify-end items-center gap-2">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openEditModal(project.id);
                        }}
                        className="text-primary-600 hover:text-primary-900 p-1"
                      >
                        <PencilIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">编辑</span>
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openDeleteModal(project.id);
                        }}
                        className="text-red-600 hover:text-red-900 p-1"
                      >
                        <TrashIcon className="h-5 w-5" aria-hidden="true" />
                        <span className="sr-only">删除</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-16 text-center">
            <p className="text-gray-500">暂无项目，请创建新项目</p>
          </div>
        )}
      </div>
      
      {/* 添加项目模态框 */}
      <Modal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="创建新项目"
      >
        <ProjectForm
          onSubmit={handleAddProject}
          onCancel={() => setIsAddModalOpen(false)}
        />
      </Modal>
      
      {/* 编辑项目模态框 */}
      <Modal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setCurrentEditingProject(null);
        }}
        title="编辑项目"
      >
        {editingProject && (
          <ProjectForm
            initialData={editingProject}
            onSubmit={handleEditProject}
            onCancel={() => {
              setIsEditModalOpen(false);
              setCurrentEditingProject(null);
            }}
          />
        )}
      </Modal>
      
      {/* 删除项目确认框 */}
      <Modal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setCurrentDeletingProject(null);
        }}
        title="删除项目"
        size="sm"
      >
        <div className="text-sm text-gray-500 mb-4">
          你确定要删除项目 <span className="font-semibold">{deletingProject?.name}</span> 吗？此操作无法撤销，并且会删除项目下所有信令。
        </div>
        <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
            onClick={handleDeleteProject}
          >
            <TrashIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
            删除
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={() => {
              setIsDeleteModalOpen(false);
              setCurrentDeletingProject(null);
            }}
          >
            取消
          </button>
        </div>
      </Modal>
    </div>
  );
}
