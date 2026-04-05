import { ref } from 'vue';
import { mailApi } from '../api/mail';
import { useMailStore } from '../stores/mail';
export function useMail() {
    const store = useMailStore();
    const loading = ref(false);
    const error = ref('');
    const loadMailboxes = async () => {
        loading.value = true;
        try {
            const res = await mailApi.getMailboxes();
            store.mailboxes = res.data;
            if (res.data.length > 0 && !store.currentMailbox) {
                store.currentMailbox = res.data[0].address;
            }
        }
        catch (e) {
            error.value = e.message;
        }
        finally {
            loading.value = false;
        }
    };
    return { store, loading, error, loadMailboxes };
}
//# sourceMappingURL=useMail.js.map