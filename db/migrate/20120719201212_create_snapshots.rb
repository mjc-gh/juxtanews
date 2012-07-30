class CreateSnapshots < ActiveRecord::Migration
  def change
    create_table :snapshots do |t|
      t.references    :site

      t.attachment    :image

      # time for HTTP requests and img to build
      # does not include save\paperclip time
      t.float         :runtime
      t.timestamps
    end
  end
end
