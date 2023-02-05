import { ToastSeverity } from 'primevue/api'
import { useToast } from 'primevue/usetoast'

const DURATION = 5000

export const useNotification = () => {
    const toast = useToast()
    const { $t } = useTranslate()

    const showSuccess = ({ title = $t('Error'), description }) => {
        toast.add({ severity: ToastSeverity.SUCCESS, summary: title, detail: description, life: DURATION })
    }

    const showError = ({ title = $t('Error'), description }) => {
        toast.add({ severity: ToastSeverity.ERROR, summary: title, detail: description, life: DURATION })
    }

    return { showError, showSuccess }
}
