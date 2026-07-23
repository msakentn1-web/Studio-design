import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Maestro Design Studio',
  description: 'متجر احترافي فخم لتصاميم الهوية البصرية، الشعارات، والموشن جرافيك مع لوحة تحكم وإدارة طلبات عبر واتساب',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="ar" dir="rtl">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
