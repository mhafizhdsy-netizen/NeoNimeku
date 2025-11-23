# 🔔 Push Notification Guide

## Fitur yang Sudah Diimplementasikan

### 1. **Request Permission**
- Otomatis meminta izin browser saat user klik tombol notification
- Menangani 3 state: `default`, `granted`, `denied`
- Memberikan feedback yang jelas untuk setiap state

### 2. **Subscribe/Unsubscribe**
- User dapat subscribe ke anime favorit
- Data disimpan di localStorage
- Visual indicator (ping animation) untuk anime yang sudah disubscribe

### 3. **Test Notification**
- Saat subscribe, langsung mengirim test notification
- Notification berisi:
  - Title: "Subscribed to [Anime Name]"
  - Body: "You will be notified when new episodes are released!"
  - Icon: Poster anime
  - Auto-close setelah 5 detik

### 4. **Toast Feedback**
- Mengganti alert dengan toast notification yang lebih modern
- 3 jenis toast:
  - Success: Saat berhasil subscribe (hijau)
  - Warning: Saat unsubscribe (kuning)
  - Error: Saat permission ditolak (merah)

## Cara Menggunakan

### Untuk User:

1. **Enable Notifications:**
   - Klik tombol bell (🔔) di halaman anime info
   - Browser akan meminta izin untuk mengirim notifikasi
   - Klik "Allow" atau "Izinkan"

2. **Test Notification:**
   - Setelah allow, akan muncul test notification
   - Ini memastikan notification berfungsi dengan baik

3. **Disable Notifications:**
   - Klik tombol bell lagi untuk unsubscribe
   - Toast akan muncul mengkonfirmasi

### Untuk Developer:

#### Mengirim Notification untuk Episode Baru:

```javascript
import { useNotification } from '@/src/context/NotificationContext';

function YourComponent() {
  const { sendEpisodeNotification } = useNotification();
  
  // Saat episode baru tersedia
  sendEpisodeNotification({
    id: 'anime-id',
    title: 'Anime Title',
    poster: 'poster-url'
  }, episodeNumber);
}
```

#### Check Subscription Status:

```javascript
const { isSubscribed } = useNotification();

if (isSubscribed('anime-id')) {
  console.log('User subscribed to this anime');
}
```

## Browser Compatibility

✅ **Supported:**
- Chrome/Edge (Desktop & Mobile)
- Firefox (Desktop & Mobile)
- Safari (Desktop & Mobile iOS 16.4+)
- Opera

❌ **Not Supported:**
- Internet Explorer
- Older Safari versions

## Troubleshooting

### Notification tidak muncul?

1. **Check Browser Permission:**
   - Chrome: Settings → Privacy and security → Site settings → Notifications
   - Firefox: Settings → Privacy & Security → Permissions → Notifications
   - Safari: Preferences → Websites → Notifications

2. **Check Do Not Disturb:**
   - Windows: Focus Assist
   - macOS: Do Not Disturb
   - Mobile: Silent mode

3. **Check Browser Console:**
   - Buka Developer Tools (F12)
   - Lihat error di Console tab

### Permission Denied?

Jika user sudah block notification:
1. Klik icon lock/info di address bar
2. Reset notification permission
3. Refresh halaman
4. Coba lagi

## Future Enhancements

### Planned Features:

1. **Service Worker Integration:**
   - Background notifications
   - Offline support
   - Push API integration

2. **Notification Settings:**
   - Custom notification sound
   - Notification timing preferences
   - Batch notifications

3. **Backend Integration:**
   - Real-time episode detection
   - Scheduled notifications
   - Push notification server

4. **Analytics:**
   - Track notification engagement
   - A/B testing notification content
   - User preferences analysis

## Technical Details

### Storage:
- **localStorage key:** `animeNotifications`
- **Data structure:**
```json
[
  {
    "id": "anime-id",
    "title": "Anime Title",
    "poster": "poster-url",
    "addedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### Notification Options:
```javascript
{
  body: 'Notification message',
  icon: 'anime-poster.jpg',
  badge: '/logo.png',
  tag: 'unique-tag',
  requireInteraction: false,
  silent: false,
  data: { url: '/watch/anime-id' }
}
```

## Security & Privacy

- ✅ No data sent to external servers
- ✅ All data stored locally
- ✅ User has full control
- ✅ Can unsubscribe anytime
- ✅ No tracking or analytics

## Support

Jika ada masalah atau pertanyaan:
1. Check browser console untuk error
2. Verify browser compatibility
3. Check notification permissions
4. Try in incognito/private mode

---

**Note:** Push notifications memerlukan HTTPS atau localhost untuk bekerja dengan baik.
