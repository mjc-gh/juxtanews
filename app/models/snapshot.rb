class Snapshot < ActiveRecord::Base
  attr_accessible :runtime, :site_id, :image

  belongs_to :site, counter_cache: true, include: false

  has_attached_file :image,
    path: ':site_ident/:hash-:style.:extension',
    hash_secret: Juxtanews::Application.config.paperclip_token,

    storage: :s3,
    s3_credentials: Rails.root.join('config', 's3.yml'),
    #s3_protocol: Rails.env.production? ? 'https' : 'http',

    styles: {
      original: ['100%', :png], preview: ['', :png], thumbnail: ['', :png]
    },

    convert_options: {
      preview: '-crop 1024x768+0+0 -thumbnail 460x345 -quality 100',
      thumbnail: '-crop 1024x768+0+0 -thumbnail 220x165 -quality 100'
    }

  validates :image, attachment_presence: true
  validates :site, :site_ident, presence: true

  before_validation do
    self.site_ident = site.ident if site
  end

  after_create do
    site.last_snapshot_preview = self.preview
    site.last_snapshot_at = self.created_at
    site.last_snapshot_id = self.id

    site.save(validate: false)
  end

  %w[ preview original thumbnail ].each do |type|
    define_method type do
      image type.to_sym
    end
  end

  def serializable_hash(opts = {})
    options = {
      methods: [ :original ],
      only: [ :id, :created_at ]
    }

    super options.merge!(opts)
  end
end
