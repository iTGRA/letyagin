#!/usr/bin/env bash
# deploy.sh — Деплой Letяgин с GitHub
# Запуск: bash /var/www/letyagin/deploy.sh
set -e

APP_DIR="/var/www/letyagin"
SSR_SERVICE="letyagin-ssr"

echo "🚀 Deploy started at $(date '+%Y-%m-%d %H:%M:%S')"
cd "$APP_DIR"

# 1. Получить изменения
echo "📦 git pull..."
git pull origin main

# 2. PHP-зависимости (только если изменился composer.lock)
if git diff HEAD@{1} HEAD --name-only 2>/dev/null | grep -q "composer.lock"; then
  echo "🔧 composer install..."
  composer install --no-dev --optimize-autoloader --quiet
else
  echo "✅ composer.lock не изменился, пропуск"
fi

# 3. JS-зависимости + сборка (если изменился package-lock.json или JS-файлы)
if git diff HEAD@{1} HEAD --name-only 2>/dev/null | grep -qE "package-lock\.json|resources/js|resources/css"; then
  echo "⚡ npm ci + build..."
  npm ci --quiet
  npm run build --silent
  echo "⚡ SSR build..."
  npm run build:ssr --silent 2>/dev/null || node_modules/.bin/vite build --ssr --silent 2>/dev/null || true
else
  echo "✅ JS не изменился, пропуск"
fi

# 4. Миграции
echo "🗃️ migrate..."
php artisan migrate --force --quiet

# 5. Кэш
echo "🗂️ cache..."
php artisan config:cache --quiet
php artisan route:cache --quiet
php artisan view:cache --quiet
php artisan event:cache --quiet

# 6. Перезапустить SSR
echo "🔄 restart SSR..."
sudo systemctl restart "$SSR_SERVICE"
sleep 2

# 7. Проверка
STATUS=$(systemctl is-active "$SSR_SERVICE" 2>/dev/null)
if [ "$STATUS" = "active" ]; then
  echo "✅ $SSR_SERVICE active"
else
  echo "❌ $SSR_SERVICE — check: journalctl -u $SSR_SERVICE -n 20"
  exit 1
fi

echo "🎉 Deploy done! $(date '+%H:%M:%S')"
