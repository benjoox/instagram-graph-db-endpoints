MATCH (u { username: $username })
SET u.blocked_by_viewer = $blocked_by_viewer
SET u.business_email = $business_email
SET u.followed_by_count = $followed_by_count
SET u.follow_count = $follow_count
SET u.is_business_account = $is_business_account
SET u.is_private = $is_private
SET u.connected_fb_page = $connected_fb_page
SET u.is_verified= $is_verified
RETURN u