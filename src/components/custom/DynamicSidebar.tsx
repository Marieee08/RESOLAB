import dynamic from 'next/dynamic'

const DynamicSidebar = dynamic(() => import('../custom/sidebar-user'), { ssr: false })

export default DynamicSidebar