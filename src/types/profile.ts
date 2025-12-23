export interface InfoItem {
    label: string
    value: string
    icon?: string
    type?: 'text' | 'chip' | 'link'
    chipColor?: string
    href?: string
}
