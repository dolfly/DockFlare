import apiClient from './client';
export const mailApi = {
    getMailboxes: () => apiClient.get('/mailboxes'),
    getFolders: (address) => apiClient.get(`/mailboxes/${address}/folders`),
    getMessages: (address, params) => apiClient.get(`/mailboxes/${address}/messages`, { params }),
    getMessage: (address, id) => apiClient.get(`/mailboxes/${address}/messages/${id}`),
    updateMessage: (address, id, data) => apiClient.patch(`/mailboxes/${address}/messages/${id}`, data),
    deleteMessage: (address, id) => apiClient.delete(`/mailboxes/${address}/messages/${id}`),
    sendMessage: (address, data) => apiClient.post(`/mailboxes/${address}/send`, data),
    searchMessages: (address, params) => apiClient.get(`/mailboxes/${address}/search`, { params }),
    getAttachmentUrl: (id) => `/api/v1/attachments/${id}/download`
};
//# sourceMappingURL=mail.js.map