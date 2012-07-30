class Snapshot < ActiveRecord::Base
  attr_accessible :runtime, :site_id, :image

  belongs_to :site, counter_cache: true
  validates :site, presence: true

  has_attached_file :image,
    path: ':site_ident/:hash-:style.:extension',
    hash_secret: Juxtanews::Application.config.paperclip_token,

    storage: :s3,
    s3_credentials: Rails.root.join('config', 's3.yml'),
    #s3_protocol: Rails.env.production? ? 'https' : 'http',

    styles: {
      original: ['100%', :png], preview: ['', :png]
    },

    convert_options: {
      preview: '-crop 1024x768+0+0 -thumbnail 460x345 -quality 100'
    }

  validates :image, attachment_presence: true

  ##
  # TODO make this suck less; hack for paperclip
  # since Tempfile throws some random news after the extension
  #before_save do
  #  self.image_file_name = 'snapshot.png'
  #end


  after_create do
    site.last_snapshot_preview = self.preview
    site.last_snapshot_at = self.created_at
    site.last_snapshot_id = self.id

    site.save(validate: false)
  end


  def preview
    image :preview
  end

  def original
    image :original
  end

  def serializable_hash(options = {})
    options = {
      methods: [ :preview, :original ],
      only: [ :id, :created_at ]
    }

    super options
  end
end
