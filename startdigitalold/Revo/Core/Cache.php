<?php

namespace Revo\Core;

class Cache
{
    private const GROUP = 'revo';
    private const EXPIRATION = WEEK_IN_SECONDS;

    static function get(string $key)
    {
        if (wp_using_ext_object_cache()) {
            return wp_cache_get($key, self::GROUP);
        } else {
            return get_transient($key);
        }
    }

    static function set(string $key, $value, $expiration = self::EXPIRATION)
    {
        if (wp_using_ext_object_cache()) {
            wp_cache_set($key, $value, self::GROUP, $expiration);
        } else {
            set_transient($key, $value, $expiration);
        }
    }

    static function clearLike(string $key)
    {
        if (wp_using_ext_object_cache()) {
            $keys = wp_cache_get(self::GROUP, self::GROUP);
            if ($keys) {
                foreach ($keys as $k) {
                    if (strpos($k, $key) === 0) {
                        wp_cache_delete($k, self::GROUP);
                    }
                }
            }
        } else {
            global $wpdb;
            $query = $wpdb->prepare("DELETE FROM {$wpdb->prefix}options WHERE option_name LIKE %s", '%' . $wpdb->esc_like($key) . '%');
            $wpdb->query($query);
        }
    }
}
